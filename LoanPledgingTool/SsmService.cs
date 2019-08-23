using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;

namespace LoanPledgingTool
{
	public interface ISsmService<T>
	{
		T Credentials { get; }
	}

	public class AwsConfig
	{
		public string ParamName { get; set; }

		public string Region { get; set; }
	}

	public class SsmService<T> : ISsmService<T>
	{
		private readonly IOptions<AwsConfig> _config;
		private T _credentials;

		public SsmService(IOptions<AwsConfig> config)
		{
			_config = config;
		}

		public T Credentials
		{
			get
			{
				if (_credentials == null)
					_credentials = GetParameters();

				return _credentials;
			}
		}

		private T GetParameters()
		{
			string env = Environment.GetEnvironmentVariable("ENVIRONMENT");
			if (string.IsNullOrEmpty(env))
				throw new ArgumentNullException("ENVIRONMENT");

			string parameterName = string.Format(_config.Value.ParamName, env);
			var region = Amazon.RegionEndpoint.GetBySystemName(_config.Value?.Region);
			var ssmClient = new AmazonSimpleSystemsManagementClient(region);
			var response = ssmClient.GetParameterAsync(new GetParameterRequest
			{
				Name = parameterName,
				WithDecryption = true
			});

			string responseString = response.Result.Parameter.Value;
			return JsonConvert.DeserializeObject<T>(responseString);
		}
	}
}