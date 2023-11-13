/* eslint-disable no-undef */
db = db.getSiblingDB('tealicious_db')
db.createCollection('keys')

db.keys.insertOne({
    user: '8f803c54-9762-43d3-a179-888ccd5fea1d',
    __v: 0,
    createdAt: {
        $date: '2023-11-13T05:43:10.418Z'
    },
    publicKey:
        '-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEAziUUjDpqV+7opZd84lS3mBWhvy0YtbNKy4hbLmDhBIXeQf6mj9KT\nCr1cgiKiSMVec0XuCTNp2df7v3qFCHXMJv3l1K3sFuw0u+y1sExJbumRNTOumFxc\n9FtmMdZlbUDVKv29rTOmwxq8Ir3Zi1agMMx3aDeGMS4D2v8jVFEvbQyNyKUsm0tr\n1kTvY1PwVcHwtr1swIWeihV9BhFGMpIXjBCE53TqaU/vq6n2uLwDcFebBwr6cv9K\nRDj2fAgEiQQt06DeAbrJUNGNXsgo1keU0cCast/2I+2TeQLk+l335Ehb4aZTz+cK\n1N5uzqqgKoAm+OnOidfFA8kByTUpg1FlM0PEUsNwwjb4n4KKUXBbggTKSgFP2erc\n5XhXha0VttOObMR8nVQLM6zTh50YaG7rNFLyXuLEVKa3u9+NLyhroGPyGrmuMMai\nzhaMT35NZZ/QxhRysFXIR5F7zTr4wBwh4F/4Tl6we5/KOL+2VkKIi8XO0yxStdR/\n9Qo0bKslOK+Kj2pgXxq8L4Yg1UOyc+0+9ueWmyfFP4ZTHVmNbb32PZxWPYvwQE/9\nQYkiXKhQs96EY6jJHNxr72HI7MhJ1aZj4NFL4J6XXYoixLLkOiKJGDQUFGaTTor6\nxtiDPE09GxP83Bu74pPYBEhQJbT6IoJ/JhVEg9N/5cOpejryHeE3uBUCAwEAAQ==\n-----END RSA PUBLIC KEY-----',
    refreshToken: null,
    refreshTokensUsed: [],
    updatedAt: {
        $date: '2023-11-13T05:43:10.418Z'
    }
})
