import {useRouter} from "next/router";
import {User} from "$prisma/client";
import {useEffect, useState} from "react";
import {apiClient} from "~/utils/apiClient";
import _ from 'lodash'
import {Except} from "type-fest";

const UserSpecificPage = () => {
    const router = useRouter();
    const userId = router.query.userId;
    const [user, setUser] = useState<Except<User, 'password'> | undefined>(undefined);

    useEffect(() => {
        apiClient.protected.user.$get({query: {id: _.toNumber(userId)}}).then(res => {
            setUser(res[0])
        })
    }, [])

    return (
        <div>
        <h1>User Specific Page</h1>
        <p>UserId: {userId}</p>
        </div>
    );
}