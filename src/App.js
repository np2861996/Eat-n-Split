// App.js
import { useState } from "react";
import "./App.css";

const items = [
  {
    id: 1,
    name: "John Doe",
    image: "https://picsum.photos/150",
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
  const [friends, setFriends] = useState(items); // Manage list of friends
  const [showAddFriend, setShowAddFriend] = useState(false); // Toggle friend form
  const [selectedFriend, setSelectedFriend] = useState(null); // Currently selected friend

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]); // Add new friend to list
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend)); // Toggle selection
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null); // Deselect friend after splitting
  }

  return (
    <div className="App">
      <div className="AppInner">
        <h1>Split Expenses with Friends</h1>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

export default App;

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul className="friends-list">
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
  const isSelected = selectedFriend?.id === friend.id; // Highlight selected friend

  return (
    <li className={`friend ${isSelected ? "selected" : ""}`}>
      <img src={friend.image} alt={friend.name} className="friend-image" />
      <div className="friend-details">
        <h3>{friend.name}</h3>
        <p
          className={
            friend.balance < 0
              ? "balance red"
              : friend.balance > 0
              ? "balance green"
              : "balance black"
          }
        >
          Balance: ${friend.balance.toFixed(2)}
        </p>
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Deselect" : "Select"}
      </Button>
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
  const [image, setImage] = useState("https://picsum.photos/150?random=5");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("https://picsum.photos/150?random=5");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <h2>Add a New Friend</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : 0;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>Bill Value:</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        required
      />
      <label>Your Expense:</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
        required
      />
      <label>{selectedFriend.name}'s Share:</label>
      <input type="number" value={paidByFriend} readOnly />
      <label>Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
