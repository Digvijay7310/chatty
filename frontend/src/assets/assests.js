import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import user1 from './user1.jpg'
import user2 from './user2.jpg'
import user3 from './user3.jpg'
import user4 from './user4.jpg'
import user5 from './user5.jpg'
import bg_image from './bg_image.jpg'
import logo from './logo.jpg'
import search_icon from './search_icon.jpg'
import avatar_icon from './avatar_icon.jpg'
import menu_icon from './menu_icon.jpg'
import arrow_icon from './arrow_icon.jpg'
import help_icon from './help_icon.jpg'
import gallery_icon from './gallery_icon.jpg'
import logo_big from './logo_big.jpg'
import logo_icon from './logo_icon.jpg'

const assets = {
    img1, img2, img3, user1, user2, user3, user4, user5, bg_image, logo
    ,search_icon, avatar_icon, menu_icon, arrow_icon, help_icon,
    gallery_icon, logo_big, logo_icon
}
export default assets;

export const imagesDummyData = [user1, user2, user3, user4, user5]

export const userDummyData = [
    {
        "_id": "384875f849rj49943",
        "email": "test1@gmail.com",
        "fullName": "Alison Martin",
        "profilePic": user1,
        "bio": "Hi Everyone, I am using QuickChat"
    }, 
    {
        "_id": "384875f849rj49944",
        "email": "test2@gmail.com",
        "fullName": "jimmy ",
        "profilePic": user2,
        "bio": "Hi Everyone, I am using QuickChat"
    }, 
    {
        "_id": "384875f849rj49945",
        "email": "test3@gmail.com",
        "fullName": "Noel",
        "profilePic": user3,
        "bio": "Hi Everyone, I am using QuickChat"
    }, 
    {
        "_id": "384875f849rj49946",
        "email": "test4@gmail.com",
        "fullName": "Richard",
        "profilePic": user4,
        "bio": "Hi Everyone, I am using QuickChat"
    }, 
    {
        "_id": "384875f849rj49947",
        "email": "test5@gmail.com",
        "fullName": "Peter",
        "profilePic": user5,
        "bio": "Hi Everyone, I am using QuickChat"
    }, 
]

export const messagesDummyData = [
    {
        "_id": "jh83498ujkd8uu994ru8r4234",
        "senderId": "384875f849rj49947",
        "receiverId": "384875f849rj49946",
        "text": "hello how are you this is first chat",
        "seen": "true",
        "createdAt": "2025-04-28T10:23:27.844Z",
    },
    {
        "_id": "jh83498ujkd8uu994ru8r4235",
        "senderId": "384875f849rj49946",
        "receiverId": "384875f849rj49947",
        "text": "Yes bro me too chat",
        "seen": "true",
        "createdAt": "2025-04-28T10:24:27.844Z",
    },
    {
        "_id": "jh83498ujkd8uu994ru8r4236",
        "senderId": "384875f849rj49947",
        "receiverId": "384875f849rj49946",
        "text": "How is Your day now",
        "seen": "true",
        "image": img1,
        "createdAt": "2025-04-28T10:25:27.844Z",
    },
    {
        "_id": "jh83498ujkd8uu994ru8r4237",
        "senderId": "384875f849rj49946",
        "receiverId": "384875f849rj49947",
        "text": "Lorem",
        "seen": "true",
        "image": img2,
        "createdAt": "2025-04-28T10:26:27.844Z",
    },
    {
        "_id": "jh83498ujkd8uu994ru8r4238",
        "senderId": "384875f849rj49947",
        "receiverId": "384875f849rj49946",
        "text": "jhkjh",
        "seen": "true",
        "image": img3,
        "createdAt": "2025-04-28T10:27:27.844Z",
    },
    {
        "_id": "jh83498ujkd8uu994ru8r4239",
        "senderId": "384875f849rj49946",
        "receiverId": "384875f849rj49947",
        "text": "Yes bro me kjkj chat",
        "seen": "true",
        "createdAt": "2025-04-28T10:23:27.844Z",
    }
]