export async function getDashboardData() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/dashboard", {
            method: 'GET',
            cache: 'no-store'
        });
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
}