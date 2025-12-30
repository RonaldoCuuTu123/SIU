// ============================================
// Script xóa tất cả bảng cũ
// Chạy: node database/dropTables.js
// ============================================

import mysql from 'mysql2/promise';

async function dropTables() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin',
        database: 'Quan_ly_thu_phi',
        port: 3306
    });

    try {
        console.log('📍 Đang kết nối tới database...');

        const queries = [
            'SET FOREIGN_KEY_CHECKS = 0',
            'DROP TABLE IF EXISTS FeeDetails',
            'DROP TABLE IF EXISTS FeeCollections',
            'DROP TABLE IF EXISTS Vehicles',
            'DROP TABLE IF EXISTS TemporaryAbsence',
            'DROP TABLE IF EXISTS TemporaryResidence',
            'DROP TABLE IF EXISTS ResidentHistory',
            'DROP TABLE IF EXISTS HouseholdHistory',
            'DROP TABLE IF EXISTS Residents',
            'DROP TABLE IF EXISTS FeeTypes',
            'DROP TABLE IF EXISTS Households',
            'DROP TABLE IF EXISTS Users',
            'SET FOREIGN_KEY_CHECKS = 1'
        ];

        console.log('🗑️ Đang xóa các bảng...\n');

        for (const query of queries) {
            try {
                await connection.execute(query);
                console.log(`✓ ${query}`);
            } catch (error) {
                console.log(`⚠️ ${query} - ${error.message}`);
            }
        }

        console.log('\n✓ Tất cả bảng cũ đã được xóa thành công!');
        console.log('📝 Bạn có thể chạy: npm run dev hoặc node index.js để tạo bảng mới');

    } catch (error) {
        console.error('❌ Lỗi kết nối database:', error.message);
        console.error('\n💡 Kiểm tra file .env:');
        console.error('   - DB_HOST=localhost');
        console.error('   - DB_USER=root');
        console.error('   - DB_PASSWORD=your_password');
        console.error('   - DB_NAME=Quan_ly_thu_phi');
    } finally {
        await connection.end();
    }
}

dropTables();
