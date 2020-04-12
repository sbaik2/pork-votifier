curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"host":"localhost","port":"8192", "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu4HkZA1Rze7pxlIWJbOiH1w/WO9lnHZPQiciL+YQ6uL3dphPWU737e+ccdrKGP1ropcBRiwelnHpv0m/5x56Pk+E2/zOKIOz5ayw43dQ4Nhx57s/Eq4lyQWtJoCbzXoJh0dN8vICaC/DT+NUE72UemC46KzGBfu2FXUYexAgpA8MyUk4sUxcP1eKQiQTIPm0reSH1aXHI/GCso52DLUuwl//RJes96gfNQUQy1R/EhLnwmrJ/Octi+DovPkg9BehwQVeBYMj1bCd+MeuyciwT6lTk6KW0L4KzmUUMK+dtUVQ5yttIzXCXsVVp6FuMJCe78hAkYQf5G/tshlFaLRE+wIDAQAB", "username":"steve", "user_ip":"1.1.1.1"}' \
  http://localhost:8000/send
