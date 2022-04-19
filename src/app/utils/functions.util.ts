export class FunctionUtil{

    public static filterByValue(array: any[], value: string) {
        return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    public static toggleBoolean(bool: boolean | undefined) {
        if (bool === true) {
            return false
        }
        else {
            return true
        }
    }
}