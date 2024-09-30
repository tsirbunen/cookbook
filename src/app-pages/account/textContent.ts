// FIXME: Check which are actually used and remove the rest.

const createAccountInfo =
  'If you have no account yet, you  can easily create one. Login with a GitHub account or use your email. You can also create multiple accounts if you wish, but then you need multiple ways of identification (for example, multiple different emails).'
const requestVerificationCodeInfo =
  'If you selected to sign up with an email and a password, but did not receive a verification email, you can request a new one. Note that this app uses free emailing services. Sometimes the quota for sending emails has been temporarily exceeded, and you may not receive the email. In that case, try again after one hour.'
const manageAccountInfo =
  'Now that you have signed into an account, you can manage your account: change your username, enable or disable saving your email in browser, sign out, or even delete your account.'
const signInInfo =
  'If you already have an account, just sign in! Note that if you selected to sign up with an email and a password, you must verify your account (with the verification email sent to you) before signing in.'

const createAccountLabel = 'CREATE ACCOUNT'
const createAccountInfoLong =
  'Currently there are two ways to create an account: with an email or with a GitHub account. In the future, other options (like Facebook or Google) will be added.'
const withEmailLabel = 'WITH EMAIL'
const createAccountWithEmailLabel = 'CREATE ACCOUNT WITH EMAIL'
const withGitHubLabel = 'WITH GITHUB'
const createAccountWithGitHubLabel = 'CREATE ACCOUNT WITH GITHUB'
const withEmailInfo =
  'Create an account with your email and a password. Note that you need access to that email to verify your account.'
const withGitHubInfo =
  'Create an account with your GitHub account. You will first be redirected to GitHub to sign in, and then back here to complete the account creation.'

const usernameLabel = 'Username'
const usernameInfo =
  "Publicity of one's recipes is optional and is set individually for each recipe. In case you allow some of your recipes to be public, this name will be displayed as the author of those recipes for all users of this app."
const usernamePlaceholder = 'Enter your username...'

const emailLabel = 'Email'
const emailInfo =
  'Your email is needed for account verification purposes only. Your email will not be shown to other users of this app or shared with any third party.'
const emailPlaceholder = 'Enter your email...'
const emailSignInInfo =
  'Please type your email below. Note that you can sing in with an email only in case that email has been verified.'

const passwordLabel = 'Password'
const passwordInfo =
  'Select a password that is at least 8 characters long and contains a small case letter, an uppercase letter, a special character and a number but no spaces.'
const passwordPlaceholder = 'Enter your password...'

const passwordConfirmationLabel = 'Password confirmation'
const passwordConfirmationInfo = 'Type the same password again to confirm it.'
const passwordConfirmationPlaceholder = 'Enter your password again...'
const createEmailAccountInfo = 'Create an account with your email and a password.'
const spamInfo =
  'NOTE: The verification email most likely ends up in the spam folder! Please check there if you do not see it in your inbox.'

const accountCreatedInfo =
  'Your account has been successfully created. Please check your email for a verification link. Note that sometimes it may take a little time for the email to arrive.'
const okGotItLabel = 'GOT IT'
const signInLabel = 'SIGN IN'

const passwordSignInInfo = 'Please type your password below.'
const emailRequestVerificationInfo =
  'Please type your email below to receive an email to enable verification of your account.'
const requestVerificationEmailLabel = 'REQUEST VERIFICATION EMAIL'
const verificationEmailRequestedInfo =
  'A verification email should be on its way now. Note that this app is using a free emailing service and sometimes the quota for sending emails may be exceeded and you may not receive the email. In that case, try again later.'
const identityProvider = 'Identity confirmation method'

const generalAccountTitle = 'GENERAL INFO'
const generalAccountInfo = [
  'Viewing publicly available recipes in the Cooking Companion app does not require an account. But in case you wish to create or edit recipes of your own, you need one.',
  'When creating or signing into an account, you need to verify your identity. This is to ensure that only you have access to your account and that you are a real person.',
  'If you choose to create an account with your email, that can optionally be stored in the browser to make later sign-ins easier.'
]
const completeCreateGitHubAccountInfo =
  'Now that you have verified your identity with GitHub, you can complete creating your account. Please select a username below. We have pre-filled it with your GitHub username, but you can change it if you wish.'

const githubLabel = 'WITH GITHUB'
const githubInfo =
  'Create an account or sign in with your GitHub account. You will first be redirected to GitHub to sign in, then back to this app.'
const emailMainInfo =
  'Create an account or sign in with your email and a password. Note that you need access to that email to verify your account.'

export const content = {
  spamInfo,
  githubLabel,
  emailMainInfo,
  githubInfo,
  createAccountInfoLong,
  completeCreateGitHubAccountInfo,
  createAccountWithEmailLabel,
  createAccountWithGitHubLabel,
  withEmailLabel,
  withGitHubLabel,
  withGitHubInfo,
  withEmailInfo,
  createAccountInfo,
  requestVerificationCodeInfo,
  manageAccountInfo,
  signInInfo,
  createAccountLabel,
  usernameLabel,
  usernameInfo,
  usernamePlaceholder,
  emailLabel,
  emailInfo,
  emailPlaceholder,
  passwordLabel,
  passwordInfo,
  passwordPlaceholder,
  passwordConfirmationLabel,
  passwordConfirmationInfo,
  passwordConfirmationPlaceholder,
  accountCreatedInfo,
  okGotItLabel,
  signInLabel,
  emailSignInInfo,
  passwordSignInInfo,
  emailRequestVerificationInfo,
  requestVerificationEmailLabel,
  verificationEmailRequestedInfo,
  identityProvider,
  generalAccountTitle,
  generalAccountInfo,
  createEmailAccountInfo
}
