import bcrypt from "bcrypt";
const hashPassword=async(plainPassword)=>{
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(plainPassword,saltRounds);
    return hashPassword;
};

const comparePassword=async(plainPassword,hashPassword)=>{
    return await bcrypt.compare(plainPassword,hashPassword);
};
export {hashPassword,comparePassword};