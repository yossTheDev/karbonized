import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKComponentStore } from '@/stores/kcomponent-store';
import { KComponent } from '@/models/KComponent';
import { Search, Plus, Trash2, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComponentsGalleryProps {
	onAddToCanvas: (component: KComponent) => void;
}

export const ComponentsGallery: React.FC<ComponentsGalleryProps> = ({ onAddToCanvas }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const { importedComponents, removeImportedComponent } = useKComponentStore();

	const filteredComponents = useMemo(() => {
		if (!searchQuery.trim()) return importedComponents;

		const query = searchQuery.toLowerCase();
		return importedComponents.filter((item) => {
			const { name, author, description, category, tags } = item.component.manifest;
			return (
				name.toLowerCase().includes(query) ||
				author?.toLowerCase().includes(query) ||
				description?.toLowerCase().includes(query) ||
				category?.toLowerCase().includes(query) ||
				tags?.some((tag) => tag.toLowerCase().includes(query))
			);
		});
	}, [importedComponents, searchQuery]);

	const handleDelete = (id: string) => {
		removeImportedComponent(id);
	};

	return (
		<div className="flex h-full flex-col gap-4">
			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search components..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-9"
				/>
			</div>

			{/* Components List */}
			<ScrollArea className="flex-1">
				{filteredComponents.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-8 text-center">
						<FileText className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
						<p className="text-sm text-muted-foreground">
							{searchQuery ? 'No components found' : 'No components imported yet'}
						</p>
						{!searchQuery && (
							<p className="text-xs text-muted-foreground mt-1">
								Import components from the Components menu
							</p>
						)}
					</div>
				) : (
					<div className="space-y-2 pr-4">
						{filteredComponents.map((imported) => (
							<div
								key={imported.id}
								className="border rounded-lg p-3 bg-card hover:bg-muted/50 transition-colors"
							>
								<div className="flex items-start justify-between gap-2">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<p className="font-semibold text-sm truncate">
												{imported.component.manifest.name}
											</p>
											{imported.component.manifest.category && (
												<Badge variant="secondary" className="text-xs shrink-0">
													{imported.component.manifest.category}
												</Badge>
											)}
										</div>
										{imported.component.manifest.author && (
											<p className="text-xs text-muted-foreground">
												By {imported.component.manifest.author}
											</p>
										)}
										{imported.component.manifest.description && (
											<p className="text-xs text-muted-foreground line-clamp-2 mt-1">
												{imported.component.manifest.description}
											</p>
										)}
										{imported.component.manifest.tags &&
											imported.component.manifest.tags.length > 0 && (
												<div className="flex gap-1 flex-wrap mt-2">
													{imported.component.manifest.tags.slice(0, 3).map((tag) => (
														<Badge key={tag} variant="outline" className="text-xs">
															{tag}
														</Badge>
													))}
													{imported.component.manifest.tags.length > 3 && (
														<Badge variant="outline" className="text-xs">
															+{imported.component.manifest.tags.length - 3}
														</Badge>
													)}
												</div>
											)}
									</div>
									<div className="flex flex-col gap-1 shrink-0">
										<Button
											size="sm"
											onClick={() => onAddToCanvas(imported.component)}
											className="h-8 px-2"
										>
											<Plus className="h-4 w-4" />
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => handleDelete(imported.id)}
											className="h-8 px-2"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</ScrollArea>
		</div>
	);
};
