// E:\programming\Project\sciclon\pages\users\settings\[id].ts

import { useRouter } from 'next/router';

function UserSettings() {
    const router = useRouter();
    const { id } = router.query;

    return <div>User Settings Page for ID: {id}</div>;
}

export default UserSettings;
