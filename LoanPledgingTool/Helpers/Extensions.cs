namespace LoanPledgingTool.Helpers
{
    public static class Extensions
    {
        public static bool TryGetValue(dynamic obj, string name, out object result)
        {
            var p = obj.GetType().GetProperty(name);
            if (p != null)
            {
                result = obj.GetType().GetProperty(name).GetValue(obj, null);
                return true;
            }
            else
            {
                result = default(object);
                return false;
            }
        }
    }
}