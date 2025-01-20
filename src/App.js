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
  return (
    <div className="App">
      <div class="AppInner">
        <FriendsList />
        <FormAddFriend />
        <Button className="button">Add Friend</Button>
      </div>
    </div>
  );
}

export default App;

function FriendsList() {
  const friends = items;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.key} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
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

      <Button className="button">select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text" />

      <label>Image Url</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with friend</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expense</label>
      <input type="text" />

      <label>Friend's Expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
