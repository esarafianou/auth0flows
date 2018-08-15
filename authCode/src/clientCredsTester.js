var request = require("request");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var options = { method: 'GET',
  url: 'http://localhost:3000/api/private',
  rejectUnhauthorized : false,
  headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EWXdNRU15UlVKQ056ZEVPRUk0T1RrM05VTkZRVFJCUkRkQlF6QTJPREpDTXpJek1rTTFRdyJ9.eyJpc3MiOiJodHRwczovL2V2YXNhci5hdXRoMC5jb20vIiwic3ViIjoiUjRoWHQyNDRtZHJTdFkxbWJMM1diWVdDbnlwTmNTS1BAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImlhdCI6MTUzNDI3MTYwMCwiZXhwIjoxNTM0MzU4MDAwLCJhenAiOiJSNGhYdDI0NG1kclN0WTFtYkwzV2JZV0NueXBOY1NLUCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.v9PhSnb7nnMhr8hjSeWFIZamSuD4alpJ53UdQVvtcrXxYZoRd0YNRZT92BMF8slaSQ5opdKlF4JI2NwDleLUPFMhqTDV8oC-elIZHvmSMzdh3Y2ub8FUcz3AdD1-JTFDeVXh320_iwvtWtDjF0e2IuH3_kee-w7jRUM10NTKVfz6Xbg3DlOIBAB6NYwRbCM3X7tMTKh29oe-e2T56lkY21WHTPYTu_gB9RyaaFiZQpdxzibyb2xYR5taGteUiwTBro-zqPkwbWXTmexT_ttPrDv5AU71364Wtv-RTw0-5CyLGNqySFqztMwWkFB2-SUg5FEUJ6dfWbGVUcZ1pTtYkw' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
