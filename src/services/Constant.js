module.exports = {
    YES: 'Y',
    NO: 'N',
    EMAIL: 1,
    GOOGLE: 2,
    APPLE: 3,
    INACTIVE: 0,
    ACTIVE: 1,
    DELETE: 2,
    UN_VERIFY: 3,
    SUCCESS : 200,
    PENDING : 'PENDING',
    RESOLVED : 'RESOLVED',
    APPROVED :'APPROVED',
    REJECTED : 'REJECTED',
    DONE : 'DONE',
    CANCEL :'CANCEL',
    FAIL : 400,
    FAILED :'failed',
    UNAUTHORIZED : 401,
    NOT_FOUND : 404,
    NO_DATA_FOUND : 202,
    USER_IMAGE_PATH : '../public/assets/images/',
    CHAT_MEDIA_PATH : '../public/assets/chat/',
    ASSETS_PATH : '/assets/images/',
    CHAT_ASSET_PATH : '/assets/chat/',
    DUEL_CODE: 44,
    SELECTION_TYPE : {
        MULTIPLE_SELECTION : 0,
        SINGLE_SELECTION : 1,
        INPUT_NUMBER : 2
    },
    ERROR_CODES:{
        BAD_REQUEST:400,
        NOT_AUTHORISED:401,
        INTERNAL_SERVER:500,
    },
    INTERNAL_SERVER_ERROR_MESSAGE:"Some thing went wrong, please try after some time",
    HANDELED_ERRORS:[
        'Wrong password entered',
        "Username not exist",
        "A blood bank already exists by this name",
        "A Donor with this aadhar or mobile number already exists",
        "Donor with this aadhar or mobile number not exists",
    ],
    ERRORS_LIST:{
        incorrectPassword:'Wrong password entered',
        userNotExists:"Username not exist",
        bloodBankExists:"A blood bank already exists by this name",
        donorExists:"A Donor with this aadhar or mobile number already exists",
        donorNotExists:"Donor with this aadhar or mobile number not exists",
    },
    INTERNAL_SERVER : 500,
    DEVELOPER_EMAIL:'lavkeshchhatani@gmail.com',
    PAYMENT_TYPE: {
        razorpay: 'E',
        wallet: 'W',
        both: 'EW',
    },
    FILE_URI_PREFIX :{
        development:'http://localhost:4000/upload/',
        production:'https://www.hgatourbda.com/upload/',
        test:'http://hba-tour.hackerkernel.com/upload/'
    }, 
   

    MEDIA_FILE_TYPE :{
        AUDIO : 0,
        VIDEO : 1,
        IMAGE : 2,
        LINK  : 3,
        DOCUMENT : 4,
    },
    PER_PAGE_LIMIT : 10 ,

    EMAIL_PATH : 'src/views/emails',

    OTP_TYPE :{
        MOBILE : 1,
        EMAIL : 2,
        FORGOT_PASSWORD : 3
    },

    ADMIN : 0,
    SUB_ADMIN : 1,
    // in tokens
    WALLET_MINIMUM_AMOUNT : 200,


    SELLER : 'SELLER',
    BUYER : 'BUYER', 

   
    
}