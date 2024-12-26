import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  it('should add a user correctly', () => {
    const user = userManager.addUser('John Doe', 'john@example.com');
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
    expect(userManager.getAllUsers()).toHaveLength(1);
  });

  it('should find a user by ID', () => {
    const user1 = userManager.addUser('John Doe', 'john@example.com');
    const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

    const foundUser = userManager.findUserById(user1.id);
    expect(foundUser).toEqual(user1);

    const notFoundUser = userManager.findUserById(999);
    expect(notFoundUser).toBeUndefined();
  });

  it('should delete a user by ID', () => {
    const user1 = userManager.addUser('John Doe', 'john@example.com');
    const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

    const result = userManager.deleteUser(user1.id);
    expect(result).toBe(true);
    expect(userManager.getAllUsers()).toHaveLength(1);
    expect(userManager.findUserById(user1.id)).toBeUndefined();

    const falseResult = userManager.deleteUser(999);
    expect(falseResult).toBe(false);
  });

  it('should get all users', () => {
    const user1 = userManager.addUser('John Doe', 'john@example.com');
    const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

    const users = userManager.getAllUsers();
    expect(users).toHaveLength(2);
    expect(users).toContainEqual(user1);
    expect(users).toContainEqual(user2);
  });
});
