<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CSC561 | Lab1c</title>
  </head>
<body>

<h3>Status of all of our inventory items - (Inventory -> { belongsTo } -> Status)</h3>

<table border="1">
				<thead>
                    <th>Inventory Item</th>
					<th>Description</th>
				</thead>

				<tbody>
					@foreach ($inventories as $inventory)
                    <tr>
                            <td>{{ $inventory->description }}</td>
							<td>{{ $inventory->status->description }}</td>
                    </tr>
                     @endforeach

                </tbody>
</table> 

<h3>Inventory Items that have a status of Checked Out - (Status -> { hasMany } -> Inventory)</h3>

<table border="1">
				<thead>
                    <th>Inventory Item</th>
					<th>Description</th>
				</thead>

			<tbody>
					@foreach ($statuses->where('description', 'Checked out')->first()->inventory as $checked_out_inventory)
                    <tr>
                            <td>{{ $checked_out_inventory->description }}</td>
							<td>{{ $checked_out_inventory->status->description }}</td>
                    </tr>
                     @endforeach

                </tbody>
</table> 

<h3>All of the transactions are users - (transactions -> { belongsTo } Users)</h3>
<table border="1">
				<thead>
                    <th>Users</th>
					<th>Transaction_ID</th>
				</thead>

				<tbody>
					@foreach ($transactions as $transaction)
                    <tr>
                            <td>{{ $transaction->user->first_name }}</td>
							<td>{{ $transaction->id }}</td>
                    </tr>
                     @endforeach

                </tbody>
</table> 

<h3>Users have inventory items in transcations under check out - (Users -> { hasMany } -> transcations) </h3>
<table border="1">
				<thead>
                    <th>User</th>
					<th>Transactions</th>
				</thead>

				<tbody>
					@foreach ($users->where ('first_name', 'D')->first()->transaction as $c_transaction)
                    <tr>
                            <td>{{ $c_transaction->user->first_name }}</td>
							<td>{{ $c_transaction->checkout_time }}</td>
                    </tr>
                     @endforeach

                </tbody>
</table> 

<h3>Inventory items have a transcations of Check out time - (transcations -> { belongsTo } -> inventory)</h3>

<table border="1">
				<thead>
                    <th>Inventory Item</th>
					<th>Checkout_time</th>
				</thead>

				<tbody>
					@foreach ($transactions as $transaction)
                    <tr>
                            <td>{{ $transaction->inventory->description }}</td>
							<td>{{ $transaction->checkout_time }}</td>
                    </tr>
                     @endforeach

                </tbody>
</table> 

</body>
</html>
