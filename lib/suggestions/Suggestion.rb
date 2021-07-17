class SuggestionTree
  def initialize()
    @root = Node.new(nil, nil)
    @children = []
  end

  def root
    @root
  end

  def children
    @children
  end

  def add_Event(event)
    attributes = [["category",event.category], ["location",event.location], ["paid",event.paid]]
    dfs(@root,attributes)
  end

  def dfs(node, attributes)
    if attributes.empty?
      return
    end

    attribute = attributes.pop
    key = attribute[0]
    val = attribute[1]

    if node.catalog[val] != nil 
      index = node.catalog[val]
      self.dfs(node.children[index], attributes)

    else
      new_Node = Node.new(key, val)
      node.children.push(new_Node)
      index = node.children.length - 1
      node.catalog[val] = index
      self.dfs(new_Node, attributes)
    end
  end

  def printTree( node = @root)
    puts node.val
    if node.children.empty?
      return
    end

    while !node.children.empty?
      current = node.children.pop
      self.printTree(current)
    end
  end
end


class Node

  def initialize(type, val)
    @type = type
    @val = val
    @catalog = {}
    @children = []
  end
  def val 
    @val
  end
  def type
    @type
  end
  def catalog
    @catalog
  end
  def children
    @children
  end

end

class Event
  def initialize(category, paid, location)
    @category = category
    @paid = paid
    @location = location
  end

  def category
    @category
  end
  def paid
    @paid
  end
  def location
    @location
  end
end
def main
  events = [];
  events[0] = Event.new("Music", "true", "ONLINE");
  events[1] = Event.new("Health", "true", "ONLINE");
  events[2] = Event.new("Food & Drink", "true", "ONLINE");
  events[3] = Event.new("Music", "false", "ONLINE");
  events[4] = Event.new("Health", "false", "ONLINE");
  events[5] = Event.new("Food & Drink", "false", "ONLINE");
  events[6] = Event.new("Science & Tech", "true", "VENUE");
  events[7] = Event.new("Film & Media", "false", "VENUE");
  events[8] = Event.new("Community", "true", "VENUE");

  tree = SuggestionTree.new(); 
  events.each do |event|
    tree.add_Event(event);
  end

  tree.printTree
end

main