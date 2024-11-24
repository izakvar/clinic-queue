const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // 設置 CORS 標頭
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 處理 OPTIONS 請求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 根據路徑處理不同的請求
    if (req.url.includes('/api/clinic1')) {
        try {
            const response = await fetch('https://www.mainpi.com/query?i=2537');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return res.json(data);
        } catch (error) {
            console.error('API Error:', error);
            return res.status(500).json({
                error: 'Error fetching clinic 1 data',
                details: error.message
            });
        }
    } else if (req.url.includes('/api/clinic2')) {
        try {
            const response = await fetch('https://wroom.vision.com.tw/MainPage/ClinicInfo.aspx?CliID=8csXIzaKCpZrLxVKMAR4VQ==#WInfos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            return res.json({ waitingCount: parseWaitingCount(data) });
        } catch (error) {
            console.error('API Error:', error);
            return res.status(500).json({
                error: 'Error fetching clinic 2 data',
                details: error.message
            });
        }
    }

    // 如果沒有匹配的路由，返回 404
    return res.status(404).json({ error: 'Not found' });
};

function parseWaitingCount(html) {
    // 實現解析邏輯
    return null;
}
