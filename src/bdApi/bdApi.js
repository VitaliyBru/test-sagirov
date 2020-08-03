const FIRST_IN_ARRAY = 0;
const regExp = /([+\s])/g;
let BDTable = [];

class BdApi {
  constructor() {
  }

  static init(url, data = {field: 'empty'}) {
    // fetch(url,{
    //   method: `POST`
    // })
    //   .then((promise) => {return promise.json()})
    //   .then(BdApi.addUser)
    //   .catch((err) => {console.log(err)});
    BdApi.addUser(data);
  }

  static getUser(userIdent, password) {
    const userProfile = BDTable.filter((it) => {
      return it.email === userIdent || it.phone.replace(regExp, ``) === userIdent.toString().replace(regExp, ``);
    });

    if (userProfile.length && userProfile[FIRST_IN_ARRAY].password === password) {
      return userProfile[FIRST_IN_ARRAY];
    }

    return {};
  }

  static addUser(data) {
    BDTable.push(data);
  }
}

export default BdApi;
