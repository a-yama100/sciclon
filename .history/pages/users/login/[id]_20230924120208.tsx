// E:\programming\Project\sciclon\pages\users\login\[id].tsx

import { useRouter } from 'next/router';

function UserLogin() {
    const router = useRouter();
    const { id } = router.query;

    return <div>User Login Page for ID: {id}</div>;
}

export default UserLogin;
