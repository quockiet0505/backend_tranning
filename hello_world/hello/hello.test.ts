import { describe, expect, test  } from 'vitest';
import {get} from './hello';

describe("Hello api", () => {
  test("Adult user", async()=>{
    const response = await get({name:"My su", age: 25});
    expect(response.isAdult).toBe(true);

  });

  test("Minor user", async()=>{
    const response = await get({name: "Quoc Kiet", age: 15});
    expect(response.isAdult).toBe(false);
  })

  test("Anh Hao", async()=>{
    const response = await get({name: "Anh Hao Trinh", age: 30});
    expect(response.message).toBe("Hello Anh Hao Trinh!");
  })

});
