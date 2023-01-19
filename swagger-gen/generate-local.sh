rm -rf ../src/app/api-client/api/*.*
rm -rf ../src/app/api-client/model/*.*
rm -rf ../src/app/api-client/*.*
java -jar swagger-codegen-cli-3.0.26.jar generate -i https://localhost:7184/swagger/v1/swagger.json -l typescript-angular  -o ../src/app/api-client
