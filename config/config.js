module.exports = {
    port: process.env.PORT || 3000,
    'url' : 'mongodb://wtfcuuser:wtfcu@ds019628.mlab.com:19628/wtfcu',

  	googleAuth: {
	    clientID         : '765299256998-qgu5hl1gg64g4qsqijvuusomh6u068n0.apps.googleusercontent.com',
	    clientSecret     : 'LV4uSE5Zmj_qAadnjoqQyh36',
	    callbackURLDev   : 'http://localhost:3000/auth/google/callback',
	    //callbackURLProd  : 'http://rayos.xyz/auth/google/callback'
    }
};
