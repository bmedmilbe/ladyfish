let jwt: string | null = null;
const user = localStorage.getItem("access");
if (typeof user === "string") jwt = user;

export default jwt;
