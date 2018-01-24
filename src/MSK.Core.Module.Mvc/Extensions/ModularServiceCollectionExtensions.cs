using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MSK.Core.Module.Mvc.LocationExpander;
using MSK.Core.Module.Mvc.Options;
using MSK.Core.Module.Mvc.RazorPages;

namespace MSK.Core.Module.Mvc.Extensions
{
    public static class ModularServiceCollectionExtensions
    {
        public static IServiceCollection AddMvcModules(this IServiceCollection services)
        {
            services.AddExtensionLocation("modules");

            var builder = services.AddMvc().AddViewLocalization();
            AddModularRazorViewEngine(services);
            AddMvcModuleCoreServices(services);

            AddModule(services);

            builder.AddModularRazorPages();

            return services;
        }

        internal static void AddMvcModuleCoreServices(this IServiceCollection services)
        {
            services.AddSingleton<IExtensionManager, ExtensionManager>();
            services.Replace(ServiceDescriptor.Scoped<IModularTenantRouteBuilder, ModularTenantRouteBuilder>());
            services.AddScoped<IViewLocationExpanderProvider, DefaultViewLocationExpanderProvider>();
            services.AddScoped<IViewLocationExpanderProvider, ModularViewLocationExpanderProvider>();
        }

        internal static void AddModularRazorViewEngine(this IServiceCollection services)
        {
            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new CompositeViewLocationExpanderProvider());
            });
        }

        internal static IServiceCollection AddExtensionLocation(this IServiceCollection services, string subPath)
        {
            return services.Configure<ExtensionExpanderOptions>(configureOptions: options =>
            {
                options.Options.Add(new ExtensionExpanderOption { SearchPath = subPath.Replace('\\', '/').Trim('/') });
            });
        }

        internal static void AddModule(this IServiceCollection service)
        {
            var serviceProvider = service.BuildServiceProvider(true);
            var extensionManager = serviceProvider.GetService<IExtensionManager>();

            foreach (var dependency in extensionManager.GetExtensions()
                     .SelectMany(x => x.ExportedTypes)
                     .Where(t => typeof(IStartup).IsAssignableFrom(t)))
            {
                service.AddSingleton(typeof(IStartup), dependency);
            }

            serviceProvider = service.BuildServiceProvider(true);
            var startups = serviceProvider.GetServices<IStartup>();

            // IStartup instances are ordered by module dependency with an Order of 0 by default.
            // OrderBy performs a stable sort so order is preserved among equal Order values.
            startups = startups.OrderBy(s => s.Order);

            // Let any module add custom service descriptors to the tenant
            foreach (var startup in startups)
            {
                startup.ConfigureServices(service);
            }

            (serviceProvider as IDisposable).Dispose();
        }
    }
}
