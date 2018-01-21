﻿using System.Collections.Generic;

namespace MSK.Core.Module.Entity
{
    public class KeyValueObject<TKey> : ValueObjectBase
    {
        public KeyValueObject(TKey key, string value)
        {
            Key = key;
            Value = value;
        }

        public TKey Key { get; private set; }
        public string Value { get; private set; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Key;
            yield return Value;
        }
    }
}
