import { toJpeg, toPng, toSvg } from 'html-to-image';
import { isNative } from './isNative';
import { Base64Binary } from './Base64Utils';
import { save } from '@tauri-apps/api/dialog';
import { writeBinaryFile, writeTextFile } from '@tauri-apps/api/fs';

export enum export_format {
	'png',
	'svg',
	'jpeg',
}

export const ExportImage = (
	name: string,
	ref: React.RefObject<HTMLDivElement>,
	type: export_format
) => {
	if (ref.current === null) {
		return;
	}

	switch (type) {
		case export_format.png:
			toPng(ref.current, {
				cacheBust: true,
			})
				.then(async (dataUrl) => {
					const inNativePl = await isNative();

					if (!inNativePl) {
						const link = document.createElement('a');
						link.download = name + '.png';
						link.href = dataUrl;
						link.click();
					} else {
						try {
							const img = Base64Binary.decodeArrayBuffer(
								dataUrl.replace('data:image/png;base64,', '')
							);

							const filePath = await save({
								defaultPath: name + '.png',
								filters: [
									{
										name: 'Image',
										extensions: ['png', 'jpeg'],
									},
								],
							});

							if (filePath) {
								await writeBinaryFile(filePath, img);
							}
						} catch (err) {
							console.log(err);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
			break;

		case export_format.jpeg:
			toJpeg(ref.current, {
				cacheBust: true,
			})
				.then(async (dataUrl) => {
					const inNativePl = await isNative();

					if (!inNativePl) {
						const link = document.createElement('a');
						link.download = name + '.jpeg';
						link.href = dataUrl;
						link.click();
					} else {
						try {
							const img = Base64Binary.decodeArrayBuffer(
								dataUrl.replace('data:image/jpeg;base64,', '')
							);

							const filePath = await save({
								defaultPath: name + '.jpeg',
								filters: [
									{
										name: 'Image',
										extensions: ['png', 'jpeg'],
									},
								],
							});

							if (filePath) {
								await writeBinaryFile(filePath, img);
							}
						} catch (err) {
							console.log(err);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
			break;

		case export_format.svg:
			toSvg(ref.current, {
				cacheBust: true,
			})
				.then(async (dataUrl) => {
					const inNativePl = await isNative();

					if (!inNativePl) {
						const link = document.createElement('a');
						link.download = name + '.svg';
						link.href = dataUrl;
						link.click();
					} else {
						try {
							const img = Base64Binary.decodeArrayBuffer(
								dataUrl.replace('data:image/svg+xml;charset=utf-8,', '')
							);

							const filePath = await save({
								defaultPath: name + '.svg',
								filters: [
									{
										name: 'Image',
										extensions: ['png', 'jpeg', 'svg'],
									},
								],
							});

							if (filePath) {
								await writeTextFile(filePath, dataUrl);
							}
						} catch (err) {
							console.log(err);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
			break;
	}
};
