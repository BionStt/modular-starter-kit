﻿using System;

namespace MSK.Core.Module.Entity
{
    public interface IDomainEvent
    {
        int EventVersion { get; set; }
        DateTime OccurredOn { get; set; }
    }
}