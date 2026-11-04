import fs from 'fs';
import path from 'path';

const VIP_FILE = path.resolve('vipUsers.json');

export function getVipUsers() {
    try {
        if (!fs.existsSync(VIP_FILE)) return [];
        const data = fs.readFileSync(VIP_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function isVip(userId) {
    const vipList = getVipUsers();
    return vipList.includes(userId);
}

export function setVip(userId, status) {
    let vipList = getVipUsers();
    if (status && !vipList.includes(userId)) {
        vipList.push(userId);
    } else if (!status) {
        vipList = vipList.filter(id => id !== userId);
    }
    fs.writeFileSync(VIP_FILE, JSON.stringify(vipList, null, 2));
}
