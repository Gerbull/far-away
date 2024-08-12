import { useState } from 'react';
import Item from './Item';

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	onClearList,
}) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items
			.slice() // Копируем этим массив
			.sort((a, b) => a.description.localeCompare(b.description)); // Сортируем по алфавиту
	if (sortBy === 'packed')
		sortedItems = items
			.slice() // Копируем этим массив
			.sort((a, b) => Number(a.packed) - Number(b.packed)); // Сортируем по состоянию булевой

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>

			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={onClearList}>Clear list</button>
			</div>
		</div>
	);
}
