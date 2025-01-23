import { useState } from "react";
import "./App.css";

const items = [
  {
    id: 1,
    name: "John Doe",
    image: "https://picsum.photos/150", // Alternative placeholder image
    balance: 1200.5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://picsum.photos/150?random=1",
    balance: 950.75,
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "https://picsum.photos/150?random=2",
    balance: 560.3,
  },
  {
    id: 4,
    name: "Bob Brown",
    image: "https://picsum.photos/150?random=3",
    balance: 789.1,
  },
  {
    id: 5,
    name: "Charlie Green",
    image: "https://picsum.photos/150?random=4",
    balance: 1023.4,
  },
];

function App() {
  const [friends, setFriends] = useState(items);

  const [showAddFriend, setShoWAddFriend] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShoWAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelection(friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }

  return (
    <div className="App">
      <div className="AppInner">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button className="button" onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      </div>
    </div>
  );
}

export default App;

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = items;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li>
      <img src={friend.img} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You Owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && (
        <p className="black">
          You Owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      <Button onClick={() => onSelection(friend)}>select 1</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://picsum.photos/150?random=4");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://picsum.photos/150?random=4");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, SetBill] = useState("");
  const [paidByUser, SetPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("");

  return (
    <form className="form-split-bill">
      <h2>split a bill with {selectedFriend.name} </h2>

      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => SetBill(Number(e.target.value))}
      />

      <label>Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => SetPaidByUser(Number(e.target.value))}
      />

      <label>{selectedFriend.name}'s Expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>Who is paying the bill</label>
      <select value={paidByUser} onChange={(e) => whoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
