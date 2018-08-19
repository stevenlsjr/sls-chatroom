
export default class DjangoApi {

  jsonHeader(){
      return new Headers({
        'Content-Type': 'application/json'
      });
  }
  async getToken(username: string, password: string) {
    const url = '/api/v0/api-token-auth/';



    const res = await fetch(url, {
      body: JSON.stringify({username, password}),
      method: 'POST',
      headers: this.jsonHeader(),
    });
    const jsRes = await res.json();
    return jsRes;
  }
}
