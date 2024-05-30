export class Extension{
     

    static jsonStringifyModifer = (param: any): any => {
        return JSON.stringify(
          param,
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        );
      };


      static isNullOrEmpty(value: string | any[]): boolean {
        return value === null || value === undefined || value.length === 0;
      }

      static isNullOrEmptyOrZero(value: string | any[] | number): boolean {
        if (value === null || value === undefined) {
          return true;
        }
    }


}