import { Button, Modal } from 'react-daisyui';
import ReactMarkdown from 'react-markdown';

interface Props {
	open: boolean;
	onClose?: Function;
}

const changelog = `
## v 1.4.3

* add: Donations Panel
* add: Changelog Panel
* fix: Minor UI fixes

## v 1.4.2

* add: Duplicate Option to Menu Bar
* improve: ColorPicker Behavior
* fix: Drawing Bar Wrong Position
* fix: Incorrect Size for Draw Canvas
* fix: Remove Exit Animation for Menus
* fix: You Need at least one Workspace
* fix: Color Picker Position on Drawing Panel
* fix: Snap System not work with multiples Workspaces

## v 1.4.1

* fix: Adding more tap area to Tab Items
* improve: Add loading state in Render Preview
* fix: Hide Controls
* fix: Auto Zoom in Workspace

## v 1.4.0

* New Workspaces System

## v 1.3.7

feat: Duplicate Controls (Shortcut Ctrl+D)
fix: Wrong Control Position in Status Bar

## v 1.3.6

* Improve UI for Web Version

## v 1.3.5

* Added Menu Bar
* Some improvements in Status Bar
* Minor Bug Fixes

## v 1.3.4

fix: Some Text Fields Overflow the Setting Panel
fix: Wrong Position of Drawing Panel

## v 1.3.3

* Change Editor Layout
* Layout Modes
* Various UI/UX Editor Improvements
* Double Click to Edit Control

## v 1.3.2

* fix: Bug in Automatic Centering

## v 1.3.1

* Move Background Settings to Menu Tab Bar

## v 1.3.0

* New Feature: Controls Hierarchy

## v 1.2.1

* Key Shortcut (Ctrl+N) to Create New Project
* Fix: New Elements get the same properties of the latest element before create new project
* Fix: Min Height and Width on Code Blocks

## v 1.2.0

* New Project Wizard
* Improve Redo/Undo System

## v 1.1.3

* Improve Redo Undo System
* Improve Performance
* Fix Github pages Deploy Workflow

## v 1.1.2

* Degree Angles To Snap Rotation
* Change Default Workspace Color
* Center View on Start and With KeyShortcut (Ctrl+Space)

## v 1.1.1

* Controls are now Snappables
* Update Project Dependencies
* Various Editor Improvements
* Some Improvements
* Minor Bug Fixes

## v 1.1.0 - Release (July 13th, 2023)

* Canvas Drawing System
* Transparent Background on Code blocks
* Some Improvements
* Minor Bug Fixes

## v 1.0.4

* Improve UI/UX
* Added Tooltips and Other Feedback controls for the users
* Improve Animations
* Now you can define and save custom gradients inside Color Picker
* Can set control size and position manually
* Add Key Shortcuts

## v 1.0.3 - Release (May 12th, 2023)

* New Design
* Change License to Apache-2.0
* Added Twitter and Badge Controls
* Now has Compiled Version for Desktop Platforms Powered by Tauri
* Added Option To Change App Theme Manually
* Improve Behavior of Editor
* Some Improvements
* Minor Bug Fixes

## v 1.0.2

* Added Light Theme
* Karbonized is now a PWA with offline support
* Added Window Control
* Replaced React-rnd for react-moveable
* Resizable Workspace
* More control over workspace
* Now you can define Workspace Name and Size
* Various improvements and Bug Fixed

## v 1.0.1

* Improve all controls
* Now you can manually define size and position of all controls
* Now you can change background color
* Now you can define colors of QR control
* Added context menu for delete component and take an individual screenshot
* Added Image Control
* Improve UI/UX
* Improve website for mobile devices

## v 1.0.0

First Version

Controls

* Text
* Qr
* Code
`;
export const ChangelogModal: React.FC<Props> = ({ open, onClose }) => {
	return (
		<Modal
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='overflow-hidden border border-neutral bg-base-200/95 backdrop-blur-2xl'
		>
			<Modal.Header className='font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Changelog
				</p>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col dark:text-gray-300'>
				<div className='flex max-h-96 flex-col overflow-auto font-mono'>
					<ReactMarkdown>{changelog}</ReactMarkdown>
				</div>
			</Modal.Body>

			<Modal.Actions className='hidden'>
				<Button
					className='dark:text-white'
					onClick={() => onClose && onClose()}
				>
					OK
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
