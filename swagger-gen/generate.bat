del /F /Q ..\src\app\api-client\api\*.*
del /F /Q ..\src\app\api-client\model\*.*
del /F /Q ..\src\app\api-client\*.*
java -jar swagger-codegen-cli-3.0.26.jar generate -i https://web-patient-dev-api.azurewebsites.net/swagger/v1/swagger.json -l typescript-angular  -o ../src/app/api-client