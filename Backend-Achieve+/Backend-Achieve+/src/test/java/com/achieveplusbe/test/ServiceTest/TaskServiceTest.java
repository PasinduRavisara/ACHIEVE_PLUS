package com.achieveplusbe.test.ServiceTest;

import com.achieveplusbe.dto.TaskDTO;
import com.achieveplusbe.exception.ResourceNotFoundException;
import com.achieveplusbe.exception.UnauthorizedException;
import com.achieveplusbe.model.Task;
import com.achieveplusbe.model.User;
import com.achieveplusbe.repository.TaskRepository;
import com.achieveplusbe.repository.UserRepository;
import com.achieveplusbe.service.AchievementService;
import com.achieveplusbe.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;


    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setFullName("Test User");
        mockUser.setEmail("test@example.com");

        // Setup SecurityContextHolder
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("test@example.com");
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetAllTasks() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setStatus(Task.TaskStatus.PENDING);

        when(taskRepository.findAll()).thenReturn(List.of(task));

        List<TaskDTO> tasks = taskService.getAllTasks();

        assertEquals(1, tasks.size());
        assertEquals("Test Task", tasks.get(0).getTitle());
    }

    @Test
    void testGetTaskById_whenFound() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Task by ID");
        task.setStatus(Task.TaskStatus.PENDING);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskDTO result = taskService.getTaskById(1L);
        assertEquals("Task by ID", result.getTitle());
    }

    @Test
    void testGetTaskById_whenNotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(1L));
    }

    @Test
    void testCreateTask() {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setTitle("New Task");
        taskDTO.setStatus("PENDING");

        Task taskEntity = new Task();
        taskEntity.setId(1L);
        taskEntity.setTitle("New Task");
        taskEntity.setStatus(Task.TaskStatus.PENDING);
        taskEntity.setCreatedBy(mockUser);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task savedTask = invocation.getArgument(0);
            savedTask.setId(1L);
            return savedTask;
        });

        TaskDTO result = taskService.createTask(taskDTO);

        assertEquals("New Task", result.getTitle());
        assertEquals("PENDING", result.getStatus());
    }


    @Test
    void testUpdateTaskStatus_unauthorizedUser() {
        Task task = new Task();
        task.setId(1L);
        task.setStatus(Task.TaskStatus.PENDING);
        User anotherUser = new User();
        anotherUser.setId(2L);
        task.setAssignedUser(anotherUser);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertThrows(UnauthorizedException.class, () -> taskService.updateTaskStatus(1L, "COMPLETED"));
    }

    @Test
    void testGetTaskById_ReturnsTaskDTO() {
        // Arrange
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setDescription("Some description");
        task.setStatus(Task.TaskStatus.PENDING);
        task.setDueDate(LocalDateTime.now().toLocalDate());
        task.setPoints(10);
        task.setCreatedAt(LocalDateTime.now());

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // Act
        TaskDTO result = taskService.getTaskById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        assertNotNull(result.getCreatedAt()); // Make sure the date is not null
    }

    @Test
    void testGetTaskById_ThrowsException_WhenNotFound() {
        // Arrange
        when(taskRepository.findById(2L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(2L));
    }
}
