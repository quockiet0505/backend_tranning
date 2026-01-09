import {api} from 'encore.dev/api';

interface HelloRequest{
  name: string;
  age?: number;
};

interface  HelloResponse{
  message: string;
  isAdult?: boolean;
}

export const get = api(
  {expose: true, method: "GET", path: "/hello/get"},
  async(req: HelloRequest): Promise<HelloResponse>=> {
    const {name, age} = req;

    if(name.trim().length ==0){
       throw new Error("Name cannot be empty!");
    }

    return {
      message: `Hello, ${name}!`,
      isAdult: age!=undefined ? age>=18: undefined,
    }
  }
)

interface Response{
  message: string;
}