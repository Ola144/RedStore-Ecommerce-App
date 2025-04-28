import { FormControl, FormControlState } from "@angular/forms";

export class CustomValidators{
    static fullNameSpaceAllowed(control: FormControlState<any>) {
        if (control.value != null && control.value.indexOf(' ') == -1) {
            return { fullNameSpaceAllowed: true }
        } 
        return null;
    }

    static firstLetterUppercase(control: FormControlState<any>) {
        let firstLetter = 'a';
        firstLetter = control.value[0];
        
        if (control.value != null && firstLetter != undefined && firstLetter != firstLetter.toLocaleUpperCase()) {
            return { firstLetterUppercase: true }
        } 
        return null;
    }

    static provideValidPhoneNo(control: FormControlState<any>) {
        if (control.value != null && control.value.indexOf('a@=$') != -1) {
            return { provideValidPhoneNo: true }
        } 
        return null;
    }
}