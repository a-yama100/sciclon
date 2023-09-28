// E:\programming\Project\sciclon\pages\admin\dashboard\[id].ts

import { useRouter } from 'next/router';

function AdminDashboard() {
    const router = useRouter();
    const { id } = router.query;

    return <div>Admin Dashboard for ID: {id}</div>;
}

export default AdminDashboard;
