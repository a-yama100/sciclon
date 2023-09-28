// E:\programming\Project\sciclon\pages\users\dashboard\[id].ts

import { useRouter } from 'next/router';

function UserDashboard() {
    const router = useRouter();
    const { id } = router.query;

    return <div>User Dashboard for ID: {id}</div>;
}

export default UserDashboard;
