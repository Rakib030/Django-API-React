import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={`http://127.0.0.1:8000${user.avatar}`} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
