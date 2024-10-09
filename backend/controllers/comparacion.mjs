export async function pass_student(pass_in, pass_stu, user_in, user_stu){
    return (pass_in === pass_stu && user_in === user_stu);
}

export async function pass_prof(pass_in, pass_prof, user_in, user_prof){
    return (pass_in === pass_prof && user_in === user_prof);
}