interface opts {
    minLength?: number;
    maxLength?: number;
    specialCharacter?: boolean;
    uppercase?: boolean;

}

export const password = (value: string, opts: opts): string | null => {
    const {minLength, maxLength, specialCharacter, uppercase} = opts;

    if(minLength && value.length < minLength) {
        return `Password must be at least ${minLength} characters.`;
    }

    if(maxLength && value.length > maxLength) {
        return `Password must not exceed ${maxLength} characters.`;
    }

    if(specialCharacter && !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
        return `Password must contain at least one special character.`;
    }

    if(uppercase && value === value.toLowerCase()) {
        return `Password must contain an uppercase character.`;
    }

    return null;

}