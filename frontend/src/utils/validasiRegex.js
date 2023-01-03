export const firstnameValidator = (firstname) => {
  const firstnameRegex = /^[a-zA-Z]+$/;
  /* 
            penjelasan regex:
            ^ = awal string
            [a-zA-Z]+ = minimal 1 karakter huruf
            $ = akhir string
            jadi firstname harus mengandung minimal 1 karakter huruf
            jadi contoh firstname yang valid: 
            madara
        */

  return firstnameRegex.test(firstname);
};

export const lastnameValidator = (lastname) => {
  const lastnameRegex = /^[a-zA-Z]+$/;
  /* 
                penjelasan regex:
                ^ = awal string
                [a-zA-Z]+ = minimal 1 karakter huruf
                $ = akhir string
                jadi lastname harus mengandung minimal 1 karakter huruf
                jadi contoh lastname yang valid: 
                uchiha
            */

  return lastnameRegex.test(lastname);
};

export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  /* 
        penjelasan regex:
        ^ = awal string
        [^\s@]+ = minimal 1 karakter selain spasi dan @
        @ = karakter @
        [^\s@]+ = minimal 1 karakter selain spasi dan @
        $ = akhir string
        jadi email harus mengandung minimal 1 karakter selain spasi dan @, karakter @, dan minimal 1 karakter selain spasi dan @
        jadi contoh email yang valid: 
        madara@email.com
    */

  return emailRegex.test(email);
};

export const passwordValidator = (password) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  /* 
        penjelasan regex:
        (?=.*?[A-Z]) = minimal 1 huruf besar
        (?=.*?[a-z]) = minimal 1 huruf kecil
        (?=.*?[0-9]) = minimal 1 angka
        (?=.*?[#?!@$%^&*-]) = minimal 1 karakter spesial
        .{8,} = minimal 8 karakter
        jadi password harus mengandung minimal 1 huruf besar, 1 huruf kecil, 1 angka, 1 karakter spesial, dan minimal 8 karakter
        sebagai contoh password yang valid: "Password123#"
    
    */
  return passwordRegex.test(password);
};
