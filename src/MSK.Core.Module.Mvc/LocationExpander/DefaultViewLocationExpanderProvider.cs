﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Razor;

namespace MSK.Core.Module.Mvc.LocationExpander
{
    public class DefaultViewLocationExpanderProvider : IViewLocationExpanderProvider
    {
        public int Priority => 0;

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            return viewLocations;
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }
    }
}
