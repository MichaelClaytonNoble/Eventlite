class SuggestionTree
  def initialize()
    @root = Node.new('', '')
    @children = []
    @score = {}
    @score.default = {}
    @attributes= ["category", "location", "paid"]
  end

  def root
    @root
  end
  def score
    @score
  end
  def children
    @children
  end

  def add_event(event)
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
      node.score[val] += 1
      index = node.catalog[val]
      self.dfs(node.children[index], attributes)

    else
      new_Node = Node.new(key, val)
      node.children.push(new_Node)
      index = node.children.length - 1
      node.catalog[val] = index
      node.score['key'] = key
      node.score[val] = 1

      self.dfs(new_Node, attributes)
    end
  end

  def calculate_paths(node, paths, current_path, current_value, score, max_depth=2)
    if node.children.empty? || max_depth == 0
      paths.push({"path" => current_path, "val"=>current_value,"score" => score})
      return
    end


    while !node.children.empty?
      current = node.children.pop

      calculate_paths(current, paths, current_path+[node.score['key']], current_value+[current.val], score+node.score[current.val], max_depth-1)

    end
    return paths
  end


  def generate_suggestions()
    paths_3 = calculate_paths(self.root, [], [], [], 0, 3) 
    paths_3 = paths_3.sort{ |path1, path2| path2['score']<=>path1['score']}[0..3]
    paths_3
  end

  def print_tree( node = @root)
    # puts node.val
    puts node.score
    if node.children.empty?
      return
    end

    while !node.children.empty?
      current = node.children.pop
      self.print_tree(current)
    end
  end

  def build(visited)
    visited = visited.map{|visit| Event_copy.new(visit['category'],visit['paid'], visit['location'])}

    visited.each do |visit|
      add_event(visit)
    end
    generate_suggestions
  end
end


class Node

  def initialize(type, val)
    @type = type
    @val = val
    @catalog = {}
    @score = {}
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
  def score
    @score
  end
end

class Event_copy
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
  events = [] 
  events[0] = {"category"=>"Music", "paid"=>"true", "location"=>"ONLINE"} 
  events[1] = {"category"=>"Health", "paid"=>"true", "location"=>"ONLINE"} 
  events[2] = {"category"=>"Food & Drink", "paid"=>"true", "location"=>"ONLINE"} 
  events[3] = {"category"=>"Music", "paid"=>"false", "location"=>"ONLINE"} 
  events[4] = {"category"=>"Health", "paid"=>"false", "location"=>"ONLINE"} 
  events[5] = {"category"=>"Food & Drink", "paid"=>"false", "location"=>"ONLINE"} 
  events[6] = {"category"=>"Science & Tech", "paid"=>"true", "location"=>"VENUE"} 
  events[7] = {"category"=>"Film & Media", "paid"=>"false", "location"=>"VENUE"} 
  events[8] = {"category"=>"Community", "paid"=>"true", "location"=>"VENUE"} 
  events[9] = {"category"=>"Music", "paid"=>"true", "location"=>"ONLINE"} 
  events[10] = {"category"=>"Music", "paid"=>"true", "location"=>"ONLINE"} 
  events[11] = {"category"=>"Food & Drink", "paid"=>"false", "location"=>"ONLINE"} 
  events[12] = {"category"=>"Film & Media", "paid"=>"false", "location"=>"VENUE"}
  # events[0] = Event_copy.new("Music", "true", "ONLINE") 
  # events[1] = Event_copy.new("Health", "true", "ONLINE") 
  # events[2] = Event_copy.new("Food & Drink", "true", "ONLINE") 
  # events[3] = Event_copy.new("Music", "false", "ONLINE") 
  # events[4] = Event_copy.new("Health", "false", "ONLINE") 
  # events[5] = Event_copy.new("Food & Drink", "false", "ONLINE") 
  # events[6] = Event_copy.new("Science & Tech", "true", "VENUE") 
  # events[7] = Event_copy.new("Film & Media", "false", "VENUE") 
  # events[8] = Event_copy.new("Community", "true", "VENUE") 
  # events[9] = Event_copy.new("Music", "true", "ONLINE") 
  # events[10] = Event_copy.new("Music", "true", "ONLINE") 
  # events[11] = Event_copy.new("Food & Drink", "false", "ONLINE") 
  # events[12] = Event_copy.new("Film & Media", "false", "VENUE") 
  
  # events = events.map{|event| Event_copy.new(event['category'],event['paid'], event['location'])}

  tree = SuggestionTree.new()
  # events.each do |event|
  #   tree.add_event(event)
  # end

  # tree.print_tree
  # tree.generate_suggestions
  puts tree.build(events)
end

# main