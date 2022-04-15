export class functionUtil {

    public static filterByValue(array: any[], value: string) {
        return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

}