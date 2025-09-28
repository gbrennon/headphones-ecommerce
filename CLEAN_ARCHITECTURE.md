# Clean Architecture Implementation - Order Submission Use Case

This implementation follows Clean Architecture principles with distinct layer responsibilities and proper dependency rules.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                     │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │  OrderApiAdapter    │    │   CartServiceAdapter       │ │
│  │  (Persistence)      │    │   (External Service)       │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
│              │                           │                  │
│              ▼                           ▼                  │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │  IOrderRepository   │    │      ICartService           │ │
│  │  (Interface)        │    │      (Interface)            │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
│              │                           │                  │
│              └───────────┬───────────────┘                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              SubmitOrder Use Case                       │ │
│  │         (Business Logic Orchestration)                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                          │                                  │
│                          ▼                                  │
├─────────────────────────────────────────────────────────────┤
│                      Domain Layer                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 Order Entity                            │ │
│  │            (Pure Business Logic)                        │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Domain Layer (`domain/`)
- **Purpose**: Contains pure business logic and entities
- **Dependencies**: None (innermost layer)
- **Files**:
  - `entities/Order.ts`: Core Order entity with validation logic

**Key Features**:
- Order entity with comprehensive validation (`isValid()` method)
- No dependencies on external frameworks or libraries
- Pure business rules and domain logic
- Validates items, shipping info, payment details, and totals
- Generates unique order IDs
- Email validation and payment method validation

### 2. Application Layer (`application/`)
- **Purpose**: Contains use cases and defines interfaces for external dependencies
- **Dependencies**: Only depends on Domain layer
- **Files**:
  - `repositories/IOrderRepository.ts`: Interface for order persistence
  - `services/ICartService.ts`: Interface for cart management
  - `useCases/SubmitOrder.ts`: Order submission orchestration

**Key Features**:
- Use case orchestrates the order submission flow
- Defines interfaces that infrastructure must implement
- Framework-agnostic business logic
- Performs the four required steps:
  1. Create Order entity
  2. Run domain validation
  3. Persist order via repository
  4. Clear cart via service

### 3. Infrastructure Layer (`infrastructure/`)
- **Purpose**: Implements interfaces defined by application layer
- **Dependencies**: Depends on Application and Domain layers
- **Files**:
  - `persistence/OrderApiAdapter.ts`: Implements order persistence via API
  - `services/CartServiceAdapter.ts`: Implements cart clearing functionality

**Key Features**:
- Concrete implementations of application interfaces
- Handles external concerns (API calls, Redux state management)
- Adapts external libraries to application needs
- Mock API implementation for order submission

### 4. Presentation Layer (`pages/checkout.tsx`)
- **Purpose**: User interface and user interaction handling
- **Dependencies**: Uses all layers through dependency injection
- **Responsibilities**:
  - Collect user input via enhanced form components
  - Instantiate use case with proper adapters
  - Handle UI state and navigation
  - Transform cart data to order format

## Dependency Flow Explanation

The dependency flow (Infrastructure → Application → Domain) is crucial because:

### 1. **Dependency Inversion Principle**
- High-level modules (use cases) don't depend on low-level modules (adapters)
- Both depend on abstractions (interfaces)
- Infrastructure implements interfaces defined by application layer

### 2. **Business Logic Isolation**
- Domain layer contains pure business logic with no external dependencies
- Application layer orchestrates business operations without knowing implementation details
- Infrastructure layer handles technical concerns without affecting business rules

### 3. **Testability**
- Each layer can be tested independently
- Use cases can be tested with mock implementations
- Domain logic can be tested without any external dependencies

### 4. **Flexibility**
- Infrastructure can be swapped without changing business logic
- Different persistence mechanisms can be used by implementing `IOrderRepository`
- Different cart services can be used by implementing `ICartService`

## Implementation Details

### Enhanced Components
- **PaymentDetailsForm**: Form component with validation and state management
- **SummaryWithSubmit**: Summary component with submission capability
- **Button**: Enhanced with disabled state support

### State Management
- Updated Redux cart slice with total calculation
- Proper selectors for cart items and total
- Clear cart functionality integrated with use case

### API Integration
- Mock API endpoint at `/api/submit-order`
- Proper error handling and response management
- Simulated processing time for realistic UX

## Use Case Flow

1. **User fills form** → Presentation layer collects data
2. **User clicks submit** → Form validation occurs
3. **Create adapters** → Infrastructure implementations are instantiated
4. **Inject dependencies** → Use case receives adapters through constructor
5. **Execute use case** → Business logic orchestration begins:
   - Transform cart items to order items
   - Create Order entity (Domain)
   - Validate order (Domain)
   - Save order (Infrastructure via Interface)
   - Clear cart (Infrastructure via Interface)
6. **Handle result** → Navigate to success page or show error

## Key Architecture Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Easy to unit test each layer independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Flexibility**: Easy to swap implementations
5. **Framework Independence**: Business logic is not tied to Next.js, Redux, or any specific technology

## Dependency Injection in Action

```typescript
// Infrastructure → Application → Domain dependency flow
const orderRepository = new OrderApiAdapter();
const cartService = new CartServiceAdapter(() => dispatch(clearCart()));
const submitOrderUseCase = new SubmitOrder(orderRepository, cartService);

// Execute the use case
const order = await submitOrderUseCase.execute(orderData);
```

This demonstrates how:
- Infrastructure adapters are created
- They are injected into the use case
- The use case has zero knowledge of Next.js, Redux, or APIs
- Business logic remains pure and testable

## Testing Strategy

- **Domain Layer**: Test business rules and validation logic
- **Application Layer**: Test use case orchestration with mocks
- **Infrastructure Layer**: Test adapters with integration tests
- **Presentation Layer**: Test UI interactions and user flows

## File Structure

```
├── domain/
│   └── entities/
│       └── Order.ts
├── application/
│   ├── repositories/
│   │   └── IOrderRepository.ts
│   ├── services/
│   │   └── ICartService.ts
│   └── useCases/
│       └── SubmitOrder.ts
├── infrastructure/
│   ├── persistence/
│   │   └── OrderApiAdapter.ts
│   └── services/
│       └── CartServiceAdapter.ts
├── pages/
│   ├── checkout.tsx (Presentation Adapter)
│   ├── order-success.tsx
│   └── api/
│       └── submit-order.ts
└── components/
    ├── PaymentDetailsForm.tsx
    └── SummaryWithSubmit.tsx
```

This architecture ensures that the core business logic remains stable and testable while allowing for flexibility in implementation details. The dependency flow guarantees that changes in external concerns (APIs, UI frameworks, state management) don't affect the business rules, making the system maintainable and adaptable to future requirements.
