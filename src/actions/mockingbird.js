export const mockingbirdActions = {
  setAccountArea,
  payPassword
}


function setAccountArea (data) {
  return {
    type: 'SET_ACCOUNT_AREA',
    data
  }
}

function payPassword (data) {
  return {
    type: 'PAY_PASSWORD',
    data,
  }
}