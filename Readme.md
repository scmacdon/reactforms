# Engineering Specification for AWS Form Builder Application

## 1. Overview:
The AWS Form Builder is a React-based application designed to facilitate the creation and management of forms. The application employs a drag-and-drop interface, allowing users to organize form components and structure efficiently. The primary goal is to provide a user-friendly platform for designing and customizing forms with features such as task organization, status tracking, and real-time updates.

## 2. Components:

### App Component:
- Entry point of the application.
- Manages the main application logic and state.
- Renders the TaskList component and other necessary UI elements.

### TaskList Component:
- Handles the rendering, organization, and manipulation of form elements.
- Utilizes drag-and-drop functionality for task reordering and status updates.
- Provides modals for editing task details and confirming task deletion.
- Supports the creation and deletion of various form elements.

## 3. Drag-and-Drop Functionality:

- `onDragStart`: Initiates the drag-and-drop operation by setting the draggedTask state.
- `onDragEnd`: Concludes the drag-and-drop operation by resetting the draggedTask state.
- `onDragEnter`, `onDragLeave`, `onDragOver`: Manages visual feedback during drag-and-drop, indicating potential drop zones.
- `onDrop`: Handles the drop event, updating task statuses and positions based on the drag-and-drop operation.

## 4. Task Management:

### Task Representation:
- Each task is represented by an object containing attributes such as id, name, status, image, time, and days.
- Tasks are organized into columns based on their status.

### Task Actions:
- In the designer view, a form element has an edit icon. A user can click this given icon to update the form element. 
- Users can add new elements with a "+" button.
- Tasks can be deleted, with a confirmation modal to prevent accidental deletions.

## 5. Modals:

### Edit Modal:
- Allows users to modify task details such as status and text.
- Provides a "Save Changes" button to apply modifications.

### Delete Modal:
- Confirms task deletion with a prompt.
- Requires user confirmation before permanently removing a task.

## 6. Styling:

- The application includes CSS styles to enhance the visual presentation.
- Classes such as 'dragged-over' and 'small-box' are used to provide visual cues during drag-and-drop operations.

## 7. Data Persistence:

- The application currently relies on local state for task management.
- This application will be an AWS Serverless application that makes user of API Gateway, AWS Lambda functions that involve integrating data persistence mechanisms like Amazon DynamoDB, S3 for storing form configurations, and so on.

## 8. Dynamic Schema Creation and Backend Integration:

- The React app will read form attributes dynamically.
- It will create a schema based on the form attributes.
- The created schema will be posted to a backend service (e.g., AWS API Gateway).

## 9. Future Enhancements:

- Integration with AWS services for data storage and retrieval.
- Enhanced form customization features, such as adding additional attributes to tasks.
- Support for exporting and importing form configurations.

## 10. Dependencies:

- The application utilizes React for the user interface.
- CSS styles are applied for visual enhancements.
- No external state management libraries are currently utilized.

## 11. Deployment:

- The application can be deployed on AWS services like Amplify or S3 for hosting.

## 12. Testing:

- Unit testing for individual components and functions using Jest and React Testing Library.
- Integration testing for drag-and-drop functionality and modals.

## 13. Conclusion:

The AWS Form Builder is a flexible and extensible application for designing forms. It provides a robust foundation for creating, organizing, and managing form components, with the added capability of dynamically creating and persisting form schemas on a backend service like AWS RDS. Future enhancements include integration with AWS services and additional customization options.
