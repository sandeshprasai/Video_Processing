
import { UserEntity } from "../../Entities/UserEntity.js";
import { User } from "../../../../Core/Auth/Domain/User.js";

export class UserMapper
{
    static toDomain(UserEntity)
    {
         if(!UserEntity)
            return null;

         return new User
         ({
            id : UserEntity.id,
            email : UserEntity.email,
            password : UserEntity.password,
            createdAt : UserEntity.createdAt,
         })

    }

    static toEntity(User)
    {
        if(!User)
            return null;

        return new UserEntity({
            id : User.id,
            email : User.email,
            password : User.password,
            createdAt : User.createdAt,
        })
    }
       

}