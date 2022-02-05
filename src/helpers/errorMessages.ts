export const registerErrors = {
  // NO_MATCH: "Leyniorð og notendanafn passa ekki.",
  EXISTS_SSN: "Kennitala er til á skrá hjá okkur.",
  EXISTS_USER_NAME: "Notendanafn er upptekið",
  EXISTS_EMAIL: "Email er til á skrá hjá okkur."
};

export const verificationErrors = {
  SMS_EXPIRED: "Staðfestingarkóði hefur runnið út, vinsamlegast reyndu aftur.",
  TOO_MANY_REQUESTS:
    "Of margar tilraunir til að skrá sig inn, vinsamlegast reyndu aftur síðar.",
  INVALID_PHONE_NUMBER: "Villa, sláið inn símanúmer á þessu formi: +354000000",
  CAPTCHA_CHECK_FAILED:
    "Sorrí, við misstum aðeins samband, vinsamlegast reyndu aftur."
};
